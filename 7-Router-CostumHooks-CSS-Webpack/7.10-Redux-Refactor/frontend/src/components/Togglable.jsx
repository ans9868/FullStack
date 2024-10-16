import { useState, useImperativeHandle, forwardRef} from 'react';

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: !visible ? 'none' : '' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const show = () => {
        console.log("Togglable show() called");
        setVisible(true);
    };

    const hide = () => setVisible(false);

    console.log("Togglable component rendering");

    useImperativeHandle(ref, () => ({
        toggleVisibility,
        show,
        hide, }
    ));

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    );
});

export default Togglable;
