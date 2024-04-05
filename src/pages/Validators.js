import { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';

function Home () {
    const[validatorData, setValidatorData] = useState({})

    useEffect(() => {
        (async () => {
            const _response = await axios.get(process.env.REACT_APP_RPC_ENDPOINT + "/validators")
            console.log(_response)
            setValidatorData(_response["data"]["result"])
        })();
    },[])

    function ValidatorPane ({ _validatorData }) {
        return (
            <div className='flex items-center justify-between w-full border-t border-gray-500 py-4'>
                <div className='text-[14px] w-content truncate'>{_validatorData["address"]}</div>
                <div className='text-[14px]'>{parseFloat(_validatorData["voting_power"]/1000000)} NAAN</div>
                <div>{_validatorData["proposer_priority"]}</div>
            </div>
        )
    }

    return (
        <div className='bg-gray-200 h-screen w-full overflow-auto'>
            <div className='w-full h-20'></div>
            <div className='p-4 flex items-center space-x-1.5'>
                <div className='font-bold text-2xl'>Validators</div>
                <div className='text-xl'> | </div>
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-ky7im0" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <div className='text-md font-semibold'>Top Validators</div>
            </div>
            <div className='w-full flex items-center justify-between p-4 space-x-6'>
                <div className='w-full bg-white text-black p-6 rounded-md overflow-x-scroll'>
                    {/* <div>
                        <div className='text-xl'>Validators</div>
                        <div className='text-gray-500'>Top Validators</div>
                    </div> */}
                    <div className='px-4'>
                        <div className='flex justify-between py-4 font-bold text-md'>
                            <div className='w-80'>Address</div>
                            <div>Voting Power</div>
                            <div>Proposer Priority</div>
                        </div>
                        <div>
                            {
                                JSON.stringify(validatorData) !== '{}' && validatorData !== undefined ? validatorData["validators"].map(element => {
                                    return (
                                        <ValidatorPane _validatorData={element}/>
                                    )
                                }) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;