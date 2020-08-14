import React from 'react';
import {
    PaginationBtn,
    PaginationContainer,
    PaginationPageNumBtn,
} from "./styled";

export interface PaginationProps {
    page: number,
    onFirst?: () => void,
    onBack?: () => void,
    onNext?: () => void,
    onLast?: () => void
}

export const Pagination = (p: PaginationProps) => {
    return (
        <>
            <PaginationContainer>
                <PaginationBtn onClick={p.onFirst}>{"<<"}</PaginationBtn>
                <PaginationBtn onClick={p.onBack}>{"<"}</PaginationBtn>
                <PaginationPageNumBtn>{p.page}</PaginationPageNumBtn>
                <PaginationBtn onClick={p.onNext}>{">"}</PaginationBtn>
                <PaginationBtn onClick={p.onLast}>{">>"}</PaginationBtn>
            </PaginationContainer>
        </>
    );
};