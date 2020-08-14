import React from "react";
import {NotifyContainer, NotifyContent, NotifyTitle} from "./styled";
import {useNotifyBehavior} from "./hooks";
import {NotifyRoot} from "./NotifyRoot";

export const Notify = () => {
    const {notify} = useNotifyBehavior()

    if (!notify) return <></>

    return (
        <NotifyContainer>
            <NotifyRoot variant={notify.variant}>
                <NotifyTitle>{notify.title}</NotifyTitle>
                {notify.message && (
                    <NotifyContent>{notify.message}</NotifyContent>
                )}
            </NotifyRoot>
        </NotifyContainer>
    )
}