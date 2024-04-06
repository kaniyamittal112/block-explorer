import React, { useState, useEffect } from "react";
import { NavLink as Link } from 'react-router-dom';
import namadaSVG from '../namada.svg';

function Navbar () {
    const [pageURL, setPageURL] = useState(0);
    const [showTab, setShowTab] = useState(false);

    useEffect(() => {
        const arrayA = window.location.href.split("/")
        if(arrayA[arrayA.length - 1] === 'blocks' || arrayA[arrayA.length - 2] === 'blocks') {
            setPageURL("BLOCKS");
        } else if (arrayA[arrayA.length - 1] === 'search' || arrayA[arrayA.length - 2] === 'search') {
            setPageURL("SEARCH");
        } else if (arrayA[arrayA.length - 1] === 'validators' || arrayA[arrayA.length - 2] === 'validators') {
            setPageURL("VALIDATORS");
        } else {
            setPageURL("HOME");
        }
    })

    return (
        <div>
            <div className="flex flex-col  py-6 h-full bg-white border-x-2 border-gray-100">
                <div className="px-3">
                    <button onClick={() => setShowTab(true)} className="rounded p-1.5 bg-white">
                        <img src={namadaSVG}  className='w-10 h-10'/>
                    </button>
                </div>
                <div className="h-[65px]"></div>
                <div className='flex-1 flex flex-col items-center justify-start space-y-2 font-semibold text-black px-3'>
                    <Link onClick={() => {setPageURL("HOME");}} to='/'className={`flex items-center space-x-4 justify-start w-full py-2`}>
                        <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                            <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="appstore" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z"></path></svg>
                            </div>
                        </div>
                    </Link>
                    <Link onClick={() => {setPageURL("BLOCKS");}} to='/blocks' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                        <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                            <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="block" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M856 376H648V168c0-8.8-7.2-16-16-16H168c-8.8 0-16 7.2-16 16v464c0 8.8 7.2 16 16 16h208v208c0 8.8 7.2 16 16 16h464c8.8 0 16-7.2 16-16V392c0-8.8-7.2-16-16-16zm-480 16v188H220V220h360v156H392c-8.8 0-16 7.2-16 16zm204 52v136H444V444h136zm224 360H444V648h188c8.8 0 16-7.2 16-16V444h156v360z"></path></svg>
                            </div>
                        </div>
                    </Link>
                    <Link onClick={() => {setPageURL("VALIDATORS");}} to='/validators' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                        <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex `}>
                            <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                            </div>
                        </div>
                    </Link>
                    <Link onClick={() => {setPageURL("SEARCH");}} to='/search' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                        <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                            <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75] text-black">
                                <svg width="25" height="25" viewBox="0 0 50 50" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg>
                            </div>
                        </div>
                    </Link>
                </div> 
            </div>
        </div>
    )
}

export default Navbar;