import Icon from "$store/components/ui/Icon.tsx";
import { useState, useEffect } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";


export interface Props {
    /** @format html */
    title: string;
    /** @format html */
    description: string;
    /**
 * @title Expires at date
 * @format datetime
 */
    expiresAt: string;
    vaucher: string;
}

function PopUp({ props }: { props: Props }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let countdownInterval: any;

        if (isActive) {
            const expiresAtDate: any = new Date(props.expiresAt);
            const now: any = new Date();

            const totalMilliseconds = Math.max(expiresAtDate - now, 0);
            let totalSeconds: any = Math.floor(totalMilliseconds / 1000);

            countdownInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    const days = Math.floor(totalSeconds / (60 * 60 * 24));
                    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
                    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                    const seconds = totalSeconds % 60;
                    setTimeLeft({ days, hours, minutes, seconds });
                    totalSeconds--;
                } else {
                    clearInterval(countdownInterval);
                    alert('Tempo esgotado!');
                    setIsActive(false);
                }
            }, 1000);
        } else {
            clearInterval(countdownInterval);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [isActive, props.expiresAt]);

    const startCountdown = () => {
        setIsActive(true);
    };

    startCountdown()

    const [copied, setCopied] = useState(false)

    function copiarTexto() {
        let textoCopiado = document.getElementById("texto");
        textoCopiado.select();
        textoCopiado.setSelectionRange(0, 99999)
        document.execCommand("copy");
        setCopied(true)
    }

    return (
        <div className="w-full">
            <div>
                <div className="flex flex-col justify-center items-center opacity-100 rounded-2xl relative p-4 gap-4 max-w-[400px]">
                    <div dangerouslySetInnerHTML={{ __html: props.title }} className="text-[1.8rem] text-center border-b-2 border-t-2 pb-1 pt-1"></div>
                    <div className="text-center" dangerouslySetInnerHTML={{ __html: props.description }}></div>
                    <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-[0.8rem]">
                            <span className="countdown font-mono text-[2.4rem]">
                                <span style={{ "--value": timeLeft.days }}></span>
                            </span>
                            dias
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-[0.8rem]">
                            <span className="countdown font-mono text-[2.4rem]">
                                <span style={{ "--value": timeLeft.hours }}></span>
                            </span>
                            horas
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-[0.8rem]">
                            <span className="countdown font-mono text-[2.4rem]">
                                <span style={{ "--value": timeLeft.minutes }}></span>
                            </span>
                            mins
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-[0.8rem]">
                            <span className="countdown font-mono text-[2.4rem]">
                                <span style={{ "--value": timeLeft.seconds }}></span>
                            </span>
                            segs
                        </div>
                    </div>
                    <div className={"border-dashed border-[3px] border-red uppercase text-5xl font-bold cursor-pointer"} onClick={() => { copiarTexto() }}>
                        <input className={" bg-transparent cursor-pointer max-w-[300px] text-center border-none outline-none"} readonly type="text" name="texto" id="texto" placeholder="" value={props.vaucher} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export interface PropsPopUp {
    popUp: Props;
    image: {
        src: ImageWidget;
        alt: string;
    }
}

export default function PopUpExitIntent({ popUp, image }: PropsPopUp) {

    const [activeModal, setActiveModal] = useState(false)

    useEffect(() => {
        // Função para lidar com a saída do cursor da página
        function handleMouseLeave(event: any) {
            const from = event.relatedTarget || event.toElement;
            if (!from || from.nodeName == 'HTML') {
                setActiveModal(true);
            }
        }

        // Adicionar um ouvinte de eventos ao documento
        document.addEventListener('mouseleave', handleMouseLeave);



    }, [activeModal])

    let inactivityTimer;

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            setActiveModal(true);
        }, 20000); // 20 segundos em milissegundos
    };

    const handleUserActivity = () => {
        if (!activeModal) {
            setActiveModal(false);
            resetInactivityTimer();
        }
    };

    const handleScroll = () => {
        if (!activeModal) {
            setActiveModal(false);
            resetInactivityTimer();
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('scroll', handleScroll);

        resetInactivityTimer();

        return () => {
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(inactivityTimer);
        };
    }, [activeModal]);

    return (
        <>
            {activeModal &&
                <div className={"w-full h-full fixed top-0 left-0 z-50 bg-[#00000099]"} onClick={() => { setActiveModal(false) }}>
                    <div className={"w-full h-full flex justify-center items-center px-7"}>
                        <div className={"bg-[#75c2e4] flex flex-row justify-between w-full max-w-[800px] items-center rounded-lg gap-2 relative "}>
                            <div onClick={() => setActiveModal(false)} className="rotate-45 border-2 border-[#00000099] w-[50px] h-[50px] rounded-full flex justify-center items-center absolute top-0 translate-x-[-50%] translate-y-[-50%] bg-white left-0">
                                <Icon id="Plus" size={40} strokeWidth={1} />
                            </div>
                            <div className={" w-full lg:w-2/4"}>
                                <PopUp props={popUp} />
                            </div>
                            <div className={"hidden lg:flex w-3/5 h-full rounded-r-lg"}>
                                <Image className={"object-contain w-full rounded-r-lg"} src={image.src} alt={image.alt} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
