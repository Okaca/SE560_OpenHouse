'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
    title = "Eşleşen sonuç bulunamadı", // TODO: 
    subtitle = "Başka bir seçenek deneyin veya aktif filtreleri kaldırın", // TODO: 
    showReset
}) => {
    const router = useRouter();
    return (    
        <div
            className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
            "
        >
            <Heading 
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Tüm filtreleri kaldır" // TODO: 
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    );
}

export default EmptyState;