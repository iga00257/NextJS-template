import Button from "@/components/common/Button";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
const cx = classNames.bind(styles);

const Template = () => {
  return (
    <div className={cx("template")}>
      <div className={cx("container")}>
        <div className={cx("template-wrapper")}>
          <div>Buttons</div>
          <div className={cx("template-theme")}>
            <Button size="xs">test</Button>
            <Button size="sm">test</Button>
            <Button size="md">test</Button>
            <Button size="lg">test</Button>
          </div>
          <div className={cx("template-theme")}>
            <Button theme="secondary" size="xs">
              test
            </Button>
            <Button theme="secondary" size="sm">
              test
            </Button>
            <Button theme="secondary" size="md">
              test
            </Button>
            <Button theme="secondary" size="lg">
              test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
