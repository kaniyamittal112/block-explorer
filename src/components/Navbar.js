import React, { useState, useEffect } from "react";
import { NavLink as Link } from 'react-router-dom';

function Navbar () {
    const [pageURL, setPageURL] = useState(0);
    const [showTab, setShowTab] = useState(true);

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
            {
                showTab ?
                    <div className='z-10 px-4 h-screen bg-white space-y-10 w-70 bg-orange-600'>
                        <div className="flex-none flex items-center justify-center text-center py-6 space-x-6">
                            <button onClick={() => setShowTab(false)} className="rounded p-1.5 bg-gray-100">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M5 17H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M5 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                            <Link to='/' className='flex items-center space-x-1'>
                                <svg width="180" height="19" viewBox="0 0 198 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.0555 18.9998H13.8612V6.35257H6.18265V18.9998H0.98584V1.15576H19.0555V18.9998Z" fill="#FFFF00"></path><path d="M77.5562 1.16602H72.3594V18.9998H77.5562V1.16602Z" fill="#FFFF00"></path><path d="M89.683 1.16602H84.4862V18.9998H89.683V1.16602Z" fill="#FFFF00"></path><path d="M83.6197 1.16602H78.4229V18.9998H83.6197V1.16602Z" fill="#FFFF00"></path><path d="M161.849 10.952H156.652C156.652 8.42155 154.593 6.36282 152.063 6.36282V1.16602C157.46 1.16602 161.849 5.55523 161.849 10.952Z" fill="#FFFF00"></path><path d="M161.995 18.5178H144.674V1.16602H149.871V13.3235H161.995V18.5178Z" fill="#FFFF00"></path><path d="M184.994 7.46045H179.797V12.706H184.994V7.46045Z" fill="#FFFF00"></path><path d="M197.121 7.46045H191.924V12.706H197.121V7.46045Z" fill="#FFFF00"></path><path d="M191.058 7.46045H185.861V12.706H191.058V7.46045Z" fill="#FFFF00"></path><path d="M191.058 1.16602H185.861V6.41153H191.058V1.16602Z" fill="#FFFF00"></path><path d="M184.994 13.7544H179.797V18.9999H184.994V13.7544Z" fill="#FFFF00"></path><path d="M197.121 13.7544H191.924V18.9999H197.121V13.7544Z" fill="#FFFF00"></path><path d="M184.994 1.16602H179.797V6.41153H184.994V1.16602Z" fill="#FFFF00"></path><path d="M197.121 1.16602H191.924V6.41153H197.121V1.16602Z" fill="#FFFF00"></path><path d="M126.289 18.7639H121.092V6.11673H113.416V18.7639H108.219V0.919922H126.289V18.7639Z" fill="#FFFF00"></path><path d="M119.854 9.84957C119.854 11.2853 118.69 12.4467 117.257 12.4467C115.821 12.4467 114.66 11.2827 114.66 9.84957C114.66 8.41384 115.824 7.25245 117.257 7.25245C118.69 7.24988 119.854 8.41384 119.854 9.84957Z" fill="#FFFF00"></path><path d="M45.9706 1.1792L40.8276 10.0858H51.111L45.9706 1.1792Z" fill="#FFFF00"></path><path d="M40.8277 10.083L35.6847 18.9871H45.9706L40.8277 10.083Z" fill="#FFFF00"></path><path d="M51.1111 10.083L45.9707 18.9871H56.2541L51.1111 10.083Z" fill="#FFFF00"></path></svg>
                            </Link>
                        </div>
                        <div className='flex-1 flex flex-col items-center justify-center space-y-2 font-semibold text-black'>
                            <Link onClick={() => {setPageURL("HOME");}} to='/'className={`flex items-center space-x-4 justify-start w-full py-2`}>
                                <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-19d0vrp" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    </div>
                                </div>
                                <div className="text-white text-xl">Home</div>
                            </Link>
                            <Link onClick={() => {setPageURL("BLOCKS");}} to='/blocks' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                                <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-1rory0d" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                    </div>
                                </div>
                                <div className="text-white text-xl">Blocks</div>
                            </Link>
                            <Link onClick={() => {setPageURL("VALIDATORS");}} to='/validators' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                                <div class={` p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex `}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-71zm2" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                                    </div>
                                </div>
                                <div className="text-white text-xl">Validators</div>
                            </Link>
                            <Link onClick={() => {setPageURL("SEARCH");}} to='/search' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                                <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75] text-black">
                                        <svg width="25" height="25" viewBox="0 0 50 50" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path></svg>
                                    </div>
                                </div>
                                <div className="text-white text-xl">Search</div>
                            </Link>
                        </div> 
                    </div>
                 : <div className="flex flex-col py-6 space-x-6 h-full bg-orange-600">
                        <div className="px-7">
                            <button onClick={() => setShowTab(true)} className="rounded p-1.5 bg-white">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M5 17H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M5 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="h-[65px]"></div>
                        <div className='flex-1 flex flex-col items-center justify-start space-y-2 font-semibold text-black'>
                            <Link onClick={() => {setPageURL("HOME");}} to='/'className={`flex items-center space-x-4 justify-start w-full py-2`}>
                                <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-19d0vrp" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    </div>
                                </div>
                            </Link>
                            <Link onClick={() => {setPageURL("BLOCKS");}} to='/blocks' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                                <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex`}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-1rory0d" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                    </div>
                                </div>
                            </Link>
                            <Link onClick={() => {setPageURL("VALIDATORS");}} to='/validators' className={`flex items-center space-x-4 justify-start w-full py-2`}>
                                <div class={`p-3 bg-white rounded-lg justify-center items-center gap-2.5 flex `}>
                                    <div class="group-hover:text-v2-primary fill-current text-v2-lily/[.75]">
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" focusable="false" class="chakra-icon css-71zm2" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
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
            }
        </div>
    )
}

export default Navbar;