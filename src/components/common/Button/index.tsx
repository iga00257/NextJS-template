import { useState, useEffect } from "react";
import classnames from "classnames/bind";

// Components
// import Spin from '@/components/common/Spin'
import Icon from "@/assets/icons";
// Styles
import styles from "./style.module.scss";

// Variables
const cx = classnames.bind(styles);

// PropTypes

interface ButtonProps {
  children?: string | React.ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm" | "xs" | undefined;
  elementType?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: any) => void;
  isFetching?: boolean;
  theme?: string;
  disabled?: boolean;
  isOutline?: boolean;
  isMore?: boolean;
  throttleDuration?: number;
}

function Button(props: ButtonProps) {
  const {
    children,
    className,
    size = "lg",
    elementType = "button",
    isFetching = false,
    onClick = () => {},
    theme = "major",
    disabled = false,
    isOutline = false,
    isMore = false,
    throttleDuration = 1000,
    ...restProps
  } = props;

  const [isButtonFetching, setIsButtonFetching] = useState(false);
  const [isThrottling, setIsThrottling] = useState(false);

  useEffect(() => {
    let timer: any = null;

    // 因為 button 可能同時有很多 API 的 isFetching，所以中間用 setTimeout 做個緩衝
    if (isFetching) {
      setIsButtonFetching(isFetching);
    } else {
      timer = setTimeout(() => {
        setIsButtonFetching(isFetching);
      }, 200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isFetching]);

  useEffect(() => {
    let timer: any = null;

    if (isThrottling) {
      timer = setTimeout(() => {
        setIsThrottling(false);
      }, throttleDuration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isThrottling]);
  // q: give me button onclick event type
  // a: https://stackoverflow.com/questions/43159887/typescript-react-onclick-event-type
  //

  const onButtonClick = (event: any) => {
    if (disabled) return;

    if (!isThrottling) {
      setIsThrottling(true);

      if (!isButtonFetching) onClick(event);
    }
  };

  return (
    // 因為官網 Button 旁邊可能會有個 circle，所以才會多一層 wrapper，不確定 shop 會不會有，就先保留
    // 之後有需要可參考 https://www.figma.com/file/1dWyHxe1P0pm7xfgL795gp/TutorABC-Design-System?type=design&node-id=3585-16825&t=fsVysVFCy5SN3jg5-0
    <div
      className={cx("button-wrapper", className)}
      style={{ cursor: "pointer" }}
      data-is-outline={isOutline}
      onClick={onButtonClick}
    >
      <button
        className={cx("button")}
        data-size={size}
        data-theme={theme}
        data-is-outline={isOutline}
        type={elementType}
        disabled={disabled}
        {...restProps}
      >
        {!isButtonFetching && <>{children}</>}
        {isMore && !isButtonFetching && (
          <div
            className={cx("button-arrow")}
            data-theme={theme}
            data-size={size}
            data-is-outline={isOutline}
          >
            <Icon.ChevronRight />
          </div>
        )}

        {/* TODO: 原本是用 antd 的 Spin，等需要時看能不能不要用 antd */}
        {/* {isButtonFetching && <Spin className={cx('button-loading')} />} */}
      </button>
    </div>
  );
}

export default Button;
