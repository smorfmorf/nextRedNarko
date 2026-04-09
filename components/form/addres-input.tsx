"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
    onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="ee7004820e7c25e87bf7ae0a5aa936c5292a49fd"
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};
