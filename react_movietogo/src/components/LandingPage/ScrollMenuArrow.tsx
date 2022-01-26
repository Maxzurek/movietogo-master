import { useContext, useState, useEffect } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { Button, Icon } from "semantic-ui-react";


function Arrow({ children, disabled, onClick }: {
    children: React.ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
}) {
    const [isMobile, setMobile] = useState(false);

    const resize = () => {
        let currentHideNav = window.innerWidth <= 600;
        // Are we mobile?
        setMobile(currentHideNav);
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        resize();
    });

    return (
        <>
            {isMobile ? <></> 
            :
                <Button
                    disabled={disabled}
                    onClick={onClick}
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background: "transparent"
                    }}
                >
                    {children}
                </Button>
            }

        </>
    );
}

export function LeftArrow() {
    const {
        isFirstItemVisible,
        scrollPrev,
        visibleItemsWithoutSeparators,
        initComplete
    } = useContext(VisibilityContext);

    const [disabled, setDisabled] = useState(
        !initComplete || (initComplete && isFirstItemVisible)
    );
    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollPrev()}>
            <Icon name='arrow left' />
        </Arrow>
    );
}

export function RightArrow() {
    const {
        isLastItemVisible,
        scrollNext,
        visibleItemsWithoutSeparators
    } = useContext(VisibilityContext);

    const [disabled, setDisabled] = useState(
        !visibleItemsWithoutSeparators.length && isLastItemVisible
    );
    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollNext()}>
            <Icon name='arrow right' />
        </Arrow>
    );
}