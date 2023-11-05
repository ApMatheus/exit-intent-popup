import Icon from "$store/components/ui/Icon.tsx";
import { useState, useEffect } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";


export interface Props {
    /** 
     * @title Title of Contdown
     * @format html */
    title: string;
    /**
     * @title Description of Contdown 
     * @format html */
    description: string;
    /**
    * @title Expires at date
    * @format datetime
    */
    expiresAt: string;
    /** 
    * @title Voucher Contdown
    */
    vaucher: string;
    /** 
     * @title Title of Newsletter
     * @format html 
    */
    titleNewsletter: string;
    /** 
     * @title descripition of Newsletter
     * @format html 
    */
    descriptionNewsletter: string;
    /** 
     * @title message of Sucess in Newsletter
     * @format html 
    */
    msgSucessNewsletter: string;
    /** 
     * @title message of Error in Newsletter
     * @format html 
    */
    msgErrorNewsletter: string;
    /** 
    * @title voucher Newsletter
    */
    voucherNewsletter: string;
}

function PopUp({ props }: { props: Props }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [isActive, setIsActive] = useState(false);
    const [activeNewsletter, setActiveNewslleter] = useState(false)


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
                    setActiveNewslleter(true)
                    setIsActive(false);
                }
            }, 1000);
        } else {
            clearInterval(countdownInterval);
        }

        return () => {
            clearInterval(countdownInterval);
        };
    }, [isActive, props.expiresAt, activeNewsletter]);

    const startCountdown = () => {
        const expiresAtDate: any = new Date(props.expiresAt);
        const now: any = new Date();

        const totalMilliseconds = Math.max(expiresAtDate - now, 0);
        let totalSeconds: any = Math.floor(totalMilliseconds / 1000);

        if (totalSeconds > 0)
            setIsActive(true);
        else
            setActiveNewslleter(true)
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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [check, setCheck] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [checkError, setCheckError] = useState(false)
    const [form, setForm] = useState(true)
    const [newUser, setNewUser] = useState(true)

    const handleNameChange = (event: any) => {
        setName(event.target.value); // Atualiza o estado 'name' com o valor do campo de entrada
    };
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value); // Atualiza o estado 'name' com o valor do campo de entrada
    };
    const handleCheckChange = () => {
        setCheck(!check); // Atualiza o estado 'name' com o valor do campo de entrada
    };

    function submitForm() {
        if (name != "" && email != "" && check) {
            console.log("confirmado", name, email, check)
            setForm(false)
            setNameError(false)
            setEmailError(false)
            setCheckError(false)
            setNewUser(true)
        } else {
            name == "" ? setNameError(true) : setNameError(false)
            email == "" ? setEmailError(true) : setEmailError(false)
            check == false ? setCheckError(true) : setCheckError(false)
            setForm(true)
        }
        console.log(nameError, emailError, checkError)
    }

    return (
        <div className="w-full">
            <div>
                {!activeNewsletter ?
                    <div className="flex flex-col justify-center items-center opacity-100 rounded-2xl relative p-4 gap-4 max-w-[400px] lg:max-w-[350px]">
                        <div dangerouslySetInnerHTML={{ __html: props.title }} className="text-[1.8rem] text-center lg:text-start w-full px-1 border-b-2 pb-1 pt-1"></div>
                        <div className=" px-1 text-center lg:text-start" dangerouslySetInnerHTML={{ __html: props.description }}></div>
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
                            <input className={" bg-transparent cursor-pointer max-w-[300px] text-center border-none outline-none uppercase"} readonly type="text" name="texto" id="texto" placeholder="" value={props.vaucher} />
                        </div>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center opacity-100 rounded-2xl relative p-4 gap-4 max-w-[400px] lg:max-w-[350px]">
                        {form ?
                            <div className={"flex flex-col justify-center gap-4"}>
                                <div dangerouslySetInnerHTML={{ __html: props.titleNewsletter }} className="text-[1.8rem] px-1 w-full text-start border-b-2  pb-1 pt-1"></div>
                                <div className="text-start px-1" dangerouslySetInnerHTML={{ __html: props.descriptionNewsletter }}></div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label text-xs">
                                        <span className="label-text">Nome:</span>
                                    </label>
                                    <input type="text" placeholder="Nome" onChange={handleNameChange} className="input input-bordered w-full max-w-xs h-[2.5rem] text-xs" />
                                    <label className="label  text-xs">
                                        <span className="label-text">Email:</span>
                                    </label>
                                    <input type="text" placeholder="Email" onChange={handleEmailChange} className="input input-bordered w-full max-w-xs h-[2.5rem] text-xs" />
                                    <label className="label justify-start gap-2 cursor-pointer" onChange={handleCheckChange} >
                                        <input type="checkbox" className="checkbox w-[15px] h-[15px]" />
                                        <span className="label-text text-xs">Aceito os temos de uso </span>
                                    </label>
                                    <button className="btn no-animation bg-primary text-base-100 border-none" onCLick={submitForm}>Enviar</button>
                                </div>
                            </div>
                            : <div>
                                {newUser ?
                                    <div className={"w-full justify-center items-center flex flex-col gap-5"}>
                                        <div className="alert alert-success flex flex-col">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <div dangerouslySetInnerHTML={{ __html: props.msgSucessNewsletter }}>

                                            </div>
                                        </div>
                                        <div className={"border-dashed border-[3px] border-red uppercase text-5xl font-bold cursor-pointer"} onClick={() => { copiarTexto() }}>
                                            <input className={" bg-transparent cursor-pointer max-w-[300px] text-center border-none outline-none uppercase"} readonly type="text" name="texto" id="texto" placeholder="" value={props.voucherNewsletter} />
                                        </div>
                                    </div>
                                    : <div className={"w-full justify-center items-center flex flex-col gap-5"}>
                                        <div className="alert alert-error flex flex-col">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>                                            <div dangerouslySetInnerHTML={{ __html: props.msgErrorNewsletter }}>
                                            </div>
                                        </div>
                                        <button className="btn no-animation bg-red-400 text-base-100 border-none" onCLick={() => setForm(true)}>Cadastrar novo email</button>
                                    </div>

                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </div>

    );
}

export interface PropsPopUp {
    /**
     * @title Config popUp
     */
    popUp: Props;
    /**
 * @title Image of Modal
 */
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
                <div className={"w-full h-full fixed top-0 left-0 z-50 bg-[#00000099]"} >
                    <div className={"w-full h-full flex justify-center items-center px-7"}>
                        <div className={"bg-[#75c2e4] flex flex-row justify-between w-full max-w-[710px] box-content items-center rounded-lg gap-2 relative "}>
                            <div onClick={() => setActiveModal(false)} className="rotate-45 border-2 border-[#00000099] w-[30px] h-[30px] rounded-full flex justify-center items-center absolute top-0 translate-x-[-50%] translate-y-[-50%] bg-white left-0">
                                <Icon id="Plus" size={40} strokeWidth={1} />
                            </div>
                            <div className={" w-full lg:w-2/4"}>
                                <PopUp props={popUp} />
                            </div>
                            <div className={"hidden lg:flex w-3/5 h-full max-w-[356px] rounded-r-lg"}>
                                <Image className={"object-contain w-full rounded-r-lg"} src={image.src} alt={image.alt} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
