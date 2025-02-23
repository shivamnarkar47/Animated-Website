//@ts-nocheck
import { useEffect, useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
    const [currentIndex,setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false)
    const [isLoading,setIsLoading] = useState(true);
    const [loadedVideo,setLoadedVideo] = useState(0)


    const totalVideo = 4;
    const nextVdRef = useRef(null);
    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex)
    }

    useEffect(()=>{
        console.log(loadedVideo)
        if(loadedVideo === totalVideo-4){
            setIsLoading(false)
        }
    },[])

    useGSAP(()=>{
        if(hasClicked){
            gsap.set('#next-video',{visibility:'visible'})
            gsap.to('#next-video',{
                transformOrigin:'center center',
                scale:1,
                width:'100%',
                height:"100%",
                duration:1,
                ease:'power1.inOut',
                onStart:()=>nextVdRef.current.play()
            })

            gsap.from('#current-video',{
                transformOrigin:'center center',
                scale: 0,
                duration:1.5,
                ease:'power1.inOut'
            })
        }
    },{dependencies:[currentIndex],revertOnUpdate:true})


    useGSAP(()=>{
        gsap.set('#video-frame',{
            clipPath: 'polygon(14% 0%, 80% 0%, 100% 100%, 0% 100%)',
            borderRadius:'0 0 40% 10%'
        })

        gsap.from("#video-frame",{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius:"0 0 0 0",
            ease:"power1.inOut",
            scrollTrigger:{
                trigger:"#video-frame",
                start:"center center",
                end:"bottom center",
                scrub:true
            }

        })
    })


    const getVideoSrc = (index:number) => `videos/hero-${index}.mp4`;

    const upcomingVideoIndex = (currentIndex% totalVideo)+1


    const handleVideoLoad = () => {
    setLoadedVideo((prev)=>prev+1)
}
  return (
    <div
    className="relative h-dvh w-screen overflow-x-hidden"

    >
        {
            isLoading && (
                <div className="flex-center fixed z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )
        }
        <div id="video-frame" className="relative z-20 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <div>
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                        <video ref={nextVdRef}
                        src={getVideoSrc(upcomingVideoIndex)}
                        loop
                        muted
                        id="current-video"
                        className="size-64 origin-center scale-150 object-cover object-center "

                        onLoadedData={handleVideoLoad}

                        ></video>
                    </div>

                </div>
                <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex)}
               loop
                id="next-video"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                onLoadedData={handleVideoLoad}
                ></video>

                <video
                src={getVideoSrc(currentIndex=== totalVideo-1 ? 1 : currentIndex)}
                className="absolute left-0 top-0 size-full object-cover object-center"
                autoPlay
                loop
                muted
                />

            </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">
            G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
                <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
                <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                    Enter the Metagame Layer <br /> Unleash the Play Economy
                </p>
                <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>}
                containerClass="!bg-yellow-300 flex-center gap-1"
                />
            </div>
        </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black ">
            G<b>a</b>ming
        </h1>
    </div>
  )
}

export default Hero