import Tippy, { TippyProps } from "@tippyjs/react";

function Tooltip(props: TippyProps) {
  return (
    <Tippy
      arrow
      placement="auto"
      animation="shift-away"
      theme="light-border"
      {...props}
    >
      {props.children}
    </Tippy>
  );
}

export default Tooltip;
