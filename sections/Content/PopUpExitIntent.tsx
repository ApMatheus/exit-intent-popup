import PopUp, { Props } from "$store/islands/PopUp.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface PropsPopUp {
    popUp: Props;
    image: {
        src: ImageWidget;
        alt: string;
    }
}

export default function PopUpExitIntent({ popUp, image }: PropsPopUp) {
    return (
        <PopUp popUp={popUp} image={image}/>
    )
}