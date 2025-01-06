'use client';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface CommonTooltipProps {
    id: string;
    content: string;
    children: React.ReactNode;
    className?: string;
}

const CommonTooltip: React.FC<CommonTooltipProps> = ({ id, content, children, className }) => {
    return (
        <>
            <div data-tooltip-id={id} className={className}>
                {children}
            </div>

            <Tooltip id={id} content={content} className="tooltip" />
        </>
    );
};

export default CommonTooltip;
