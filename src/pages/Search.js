import { useEffect, useRef, useState } from 'react';
import { NavLink as Link, useParams, useNavigate } from 'react-router-dom';

function Search () {
    const navigate = useNavigate();
    let { id } = useParams();
    const searchInput = useRef()

    function Hash({hash}) {
        const[txnData, setTxnData] = useState({})
        useEffect(() => {
            (async () => {
                let response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/tx/" + hash);
                const _txnData = await response.json();
                if(_txnData !== null) {
                    response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/hash/" + _txnData['block_id']);
                    const _blockData = await response.json();
                    if(_blockData !== null) {
                        setTxnData({
                            'chain_id': _blockData['header']['chain_id'],
                            'block_time': _blockData['header']['time'],
                            'block_height': _blockData['header']['height'],
                            'block_hash': _txnData['block_id'],
                            'txn_hash': _txnData['hash'],
                            "txn_type": _txnData["tx_type"],
                            "fee_amount_per_gas_unit": _txnData["fee_amount_per_gas_unit"],
                            "fee_token": _txnData["fee_token"],
                            "gas_limit_multiplier": _txnData["gas_limit_multiplier"],
                            "code": _txnData["code"],
                            "data": _txnData["data"],
                            'status': !(_txnData['return_code'] === null || _txnData['return_code'] === 0) ? 'Failed' : 'Success',
                            "tx": _txnData['tx'],
                            "raw_data": JSON.stringify(_txnData)
                        })
                    }
                }
                
            })();
        },[])
        return (
            <div className='h-content space-y-6 flex flex-col'>
                <div className='p-4'>
                    <div className='bg-white text-black p-6 overflow-x-auto'>
                        <div className='text-xl'>Transaction Overview</div>
                        <div className='flex justify-between py-6'>
                            <div>
                                <div className='text-gray-400'>Transaction Hash</div>
                                <div>{txnData["txn_hash"]}</div>
                            </div>
                            <div>
                                <div className='text-gray-400'>Block Height</div>
                                <button onClick={() => {navigate('/search/' + txnData['block_height'])}} className='text-black underline'>#{txnData["block_height"]}</button>
                            </div>
                        </div>
                        <div className='flex justify-between py-6'>
                            <div>
                                <div className='text-gray-400'>Block Hash</div>
                                <div>{txnData["block_hash"]}</div>
                            </div>
                            <div>
                                <div className='text-gray-400'>Status</div>
                                <div className={`${txnData["status"] === 'Success' ? 'bg-green-900 text-green-400 ' : 'bg-red-900 text-red-400 '} rounded-md p-1 px-2`}>{txnData["status"]}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='p-4'>
                    <div className='rounded-md bg-black text-white p-6'>
                        <div className='text-xl'>Raw Data</div>
                        <div className='py-2'></div>
                        <article className='text-ellipsis border'>
                            <p>{
                                txnData["raw_data"]
                            }</p>
                        </article>
                    </div>
                </div> */}
            </div>
        )
    }

    function Height({height}) {
        const[blockData, setBlockData] = useState({})
        useEffect(() => {
            (async () => {
                const response = await fetch(process.env.REACT_APP_INDEXER_ENDPOINT + "/block/height/" + height);
                const _blockData = await response.json();
                if(_blockData !== null) {
                    setBlockData({
                        'block_height': _blockData['header']['height'],
                        "block_hash": _blockData['block_id'],
                        'block_time': _blockData['header']['time'],
                        'chain_id': _blockData['header']['chain_id'],
                        'proposer': _blockData['header']['proposer_address'],
                        "txn_hash": _blockData["tx_hashes"],
                        "txn_size": _blockData["tx_hashes"].length,
                    })
                }
            })();
        },[])
        return (
            <div className='h-content space-y-6 flex flex-col'>
                <div className='p-4'>
                    <div className='bg-white text-black p-6 overflow-x-auto'>
                        <div className='text-xl'>Block Overview</div>
                        <div className='flex justify-between py-6'>
                            <div>
                                <div className='text-gray-400'>Block Height</div>
                                <div>#{blockData["block_height"]}</div>
                            </div>
                            <div>
                                <div className='text-gray-400'>Block Time</div>
                                <div>{blockData["block_time"]}</div>
                            </div>
                            <div>
                                <div className='text-gray-400'>Transactions</div>
                                <div>{blockData["txn_size"]}</div>
                            </div>
                        </div>
                        <div className='flex justify-between py-6'>
                            <div>
                                <div className='text-gray-400'>Block Hash</div>
                                <div>{blockData["block_hash"]}</div>
                            </div>
                            <div>
                                <div className='text-gray-400'>Proposer</div>
                                <div>{blockData["proposer"]}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-4'>
                    <div className='bg-white text-black p-6 overflow-x-auto'>
                        <div className='text-xl'>Block Transactions</div>
                        <div className='py-2'></div>
                        <div>
                            <div className='flex justify-between py-4 text-lg'>
                                <div className='w-96'>Transaction</div>
                                <div>Block</div>
                                <div>Transaction Type</div>
                            </div>
                        </div>
                        <div>
                            {
                                blockData["txn_hash"] !== undefined ? blockData["txn_hash"].map(element => {
                                    return (
                                        <div className='flex items-center justify-between w-full border-t border-gray-500 py-4'>
                                            <button onClick={() => {navigate('/search/' + element['hash_id'])}} className='text-black underline text-[14px] w-80 truncate'>{element["hash_id"]}</button>
                                            <div className='text-[14px]'>#{blockData["block_height"]}</div>
                                            <div>{element["tx_type"]}</div>
                                         </div>
                                    )
                                }) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-200 h-screen w-full overflow-auto">
            <div className='w-full h-20'></div>
            <div className='w-full px-4'>
                <div className='flex justify-between z-0 w-full py-4 bg-white'>
                    <div className='flex items-center space-x-4 mx-4'>
                        <div className='text-green-700'>
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-zajgvi" height="2.2em" width="2.2em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>
                        </div>
                        <div>
                            <div className='font-semibold text-md'>shielded-expedition.88f17d1d14</div>
                        </div>
                    </div>
                    <div>
                        <form class="flex items-center w-96 mx-auto space-x-4 mx-4">   
                            <label for="voice-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input ref={searchInput} onChange={e => {searchInput.current = e.target.value}} type="text" id="voice-search" class="bg-gray-200 border border-gray-300 text-black text-sm rounded-lg focus:ring-[#FFEA00] focus:border-[#FFEA00] block w-full ps-10 p-2.5  dark:bg-gray-200 dark:border-gray-200 dark:placeholder-black dark:text-black" placeholder="Search By Block Height / Txn Hash" required />
                            </div>
                            <button onClick={() => {if(typeof(searchInput.current) !== 'object'){navigate('/search/' + searchInput.current)} }} type="submit" class="">
                                <div className='text-black'>
                                    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                {
                    id !== undefined ? 
                        isNaN(id) ?
                            // (id.slice(0,1) === 'p' && !isNaN(id.slice(1,id.length))) ?
                            //     <Proposal proposal={id}/> : 
                            <Hash hash={id}/> : <div><Height height={id}/></div> : ''
                }
            </div>
        </div>
    )
}

export default Search;