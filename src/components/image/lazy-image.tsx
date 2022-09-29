import { useState } from "react";

import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import styled, { css } from "styled-components/macro";

interface Props {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  onLoadedClassName?: string;
  useLazyLoading?: boolean;
  [key: string]: any; // ...rest
}

const LazyImage = ({
  src,
  width,
  height,
  className,
  onLoadedClassName = "",
  useLazyLoading = true,
  ...rest
}: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "230px 0px",
    skip: !useLazyLoading,
  });

  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return inView || !useLazyLoading ? (
    <Image
      className={classNames(className, {
        [`${onLoadedClassName}`]: loaded,
      })}
      onLoad={onLoad}
      width={width}
      height={height}
      src={src}
      alt=""
      $loaded={loaded}
      {...rest}
    />
  ) : (
    <div
      ref={ref}
      style={{
        position: "relative",
        top: 0,
        height: "1px",
      }}
    /> // placeholder
  );
};

const Image = styled.img<{ $loaded: boolean }>`
  opacity: 0;
  transition: opacity 250ms ease-in-out;

  ${(props) =>
    props.$loaded &&
    css`
      opacity: 1;
    `}
`;

export default LazyImage;
