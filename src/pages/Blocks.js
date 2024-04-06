import { useEffect, useState, useMemo, useRef } from 'react';
import { NavLink as Link, useParams, useNavigate } from 'react-router-dom';

const useMap = () => {
    const [map, setMap] = useState(new Map());
    const actions = useMemo(
      () => ({
        set: (key, value) =>
          setMap(prevMap => {
            const nextMap = new Map(prevMap);
            nextMap.set(key, value);
            return nextMap;
          }),
        remove: (key) =>
          setMap(prevMap => {
            const nextMap = new Map(prevMap);
            nextMap.delete(key);
            return nextMap;
          }),
        clear: () => setMap(new Map()),
      }),
      [setMap]
    );
  
    return [map, actions];
  };

function Blocks () {
    const navigate = useNavigate();

    let { page } = useParams();
    const [blockData, { set, remove, clear }] = useMap();
    const[latestBlock, setLatestBlock] = useState(0)
    const [pageId, setPageId] = useState()
    const blockIs = useRef(0);
    const [loading, setLoading] = useState(true)
    const pageSize = 20;
    if(page === undefined) {
        page = 1
    }

    const getBlockData = async () => {
        if(parseInt(blockIs.current) > 0) {
            const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/last");
            const _blockData = await response.json();
            const _latestBlock = _blockData["header"]["height"]
            if(_latestBlock !== blockIs.current) {
                let index = 0
                const currBlock = parseInt(blockIs.current)
                for(let i = currBlock + 1; i <= _latestBlock; i++) {
                    remove((currBlock - pageSize + 1 + index).toString())
                    const int_response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + i);
                    const int_blockData = await int_response.json();
                    if(int_blockData !== null) {
                        set(int_blockData["header"]["height"], {
                            "block_time": int_blockData["header"]["time"],
                            "block_height": int_blockData["header"]["height"],
                            "block_hash": int_blockData["header"]["last_block_id"]["hash"],
                            "txn_hash": int_blockData["tx_hashes"],
                            "txn_size": int_blockData["tx_hashes"].length,
                            "proposer": int_blockData["header"]["proposer_address"]
                        })
                        index++;
                        setLatestBlock(_latestBlock) 
                        blockIs.current = _latestBlock
                    }
                }
            }
        }
    }

    useEffect(() => {
        if(page === undefined) {
            page = 1
        }
        if(!isNaN(page)) {
            (async () => {
                clear()
                setLoading(true)
                const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/last");
                const _blockData = await response.json();
                const _latestBlock = _blockData["header"]["height"]
                if(_blockData !== null && _blockData["header"] != null && _blockData["header"]["height"] !== null && _blockData["header"]["height"] >= 5) {
                    for(let i = _latestBlock - (pageSize * (page - 1)); i > _latestBlock - (pageSize * (page - 1)) - pageSize; i--) {
                        const int_response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + i);
                        const int_blockData = await int_response.json();
                        set(int_blockData["header"]["height"], {
                            "block_time": int_blockData["header"]["time"],
                            "block_height": int_blockData["header"]["height"],
                            "block_hash": int_blockData["header"]["last_block_id"]["hash"],
                            "txn_hash": int_blockData["tx_hashes"],
                            "txn_size": int_blockData["tx_hashes"].length,
                            "proposer": int_blockData["header"]["proposer_address"]
                        })
                    }
                    setLatestBlock(_latestBlock) 
                    blockIs.current = _latestBlock
                }
                setLoading(false)
            })();
            if (parseInt(page) === 1) {
                const interval = setInterval(() => {
                    getBlockData();
                }, 5000);
            
                return () => clearInterval(interval);
            }
        }

    },[pageId])
    
    function BlockPane ({ blockId }) {
        const _blockData = blockData.get(blockId)
        const timeDiff = new Date() - new Date(_blockData["block_time"]);
        let timeAgo = ""
        if(timeDiff < 1000) {
            timeAgo = timeDiff + " millisecs ago"
        } else if((timeDiff/1000) < 60) {
            timeAgo = parseInt((timeDiff/1000)) + " secs ago"
        } else if((timeDiff/60000) < 60) {
            timeAgo = parseInt((timeDiff/60000)) + " mins ago"
        } else {
            timeAgo = parseInt((timeDiff/3600000)) + " hours ago"
        }
        return (
            <div className='flex items-center justify-between w-full border-b border-gray-200 py-4'>
                <div className='flex space-x-2'>
                    <div className='text-black flex items-center'>
                        <div class="bg-opacity-5 rounded-lg justify-center items-center gap-2.5 flex">
                            <div class="relative">
                                <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="block" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M856 376H648V168c0-8.8-7.2-16-16-16H168c-8.8 0-16 7.2-16 16v464c0 8.8 7.2 16 16 16h208v208c0 8.8 7.2 16 16 16h464c8.8 0 16-7.2 16-16V392c0-8.8-7.2-16-16-16zm-480 16v188H220V220h360v156H392c-8.8 0-16 7.2-16 16zm204 52v136H444V444h136zm224 360H444V648h188c8.8 0 16-7.2 16-16V444h156v360z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-1 flex flex-col justify-between'>
                        <Link to={`/search/${_blockData["block_height"]}`}><button className='text-sm font-semibold text-black underline'>#{_blockData["block_height"]}</button></Link>
                    </div>
                </div>
                <div className='text-[14px] w-[100px] truncate'>{_blockData["block_hash"]}</div>
                <div className='text-[14px] w-[120px] truncate'>{_blockData["proposer"]}</div>
                {/* <div className='text-[10px] sm:text-xs'></div> */}
                <div>{_blockData["txn_size"]}</div>
                <div className='text-[14px] truncate'>{timeAgo}</div>
            </div>
        )
    }

    return (
        <div className="bg-[#F5F5F5] h-screen w-full overflow-auto">
            <div className=' flex items-center jusify-center w-full h-20 bg-white'>
                <div className='bg-[#FEFFE6] text-[#D4B106] p-2'>Chain ID - shielded-expedition.88f17d1d14</div>
            </div>
            <div className='w-full flex items-center justify-between p-4 space-x-6'>
                <div className='w-full bg-white text-black px-6 rounded-md overflow-x-auto'>
                    <div className='py-6 flex items-center space-x-1.5 text-green-600'>
                        <div className='font-bold text-2xl'>Blocks</div>
                        <div className='text-xl'> | </div>
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-19d0vrp" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        <div className='text-md font-semibold'>Latest Blocks</div>
                    </div>
                    <div className=''>
                        <div className='flex justify-between p-4 font-semibold bg-[#F5F5F5]'>
                            <div className='w-24'>Block</div>
                            <div className='w-24'>Hash</div>
                            <div>Proposer</div>
                            <div>Txns</div>
                            <div>Time</div>
                        </div>
                        <div>
                            {
                                [...blockData.keys()].sort((a, b) => (b - a)).map((element) => {
                                    return (
                                        <BlockPane blockId={element}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blocks;