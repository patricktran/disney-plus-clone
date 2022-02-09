import { useLayoutEffect, useRef, useState, useCallback } from "react";

import throttle from "lodash.throttle";
import styled, { css } from "styled-components/macro";

import Icon, { IconButton } from "components/icon";
import Typography from "components/typography";
import {
  disableScrollbar,
  defaultVideoControlsOpacity,
} from "styles/placeholders/base";
import AppContext from "utils/app-context";

interface Props {
  title: string;
  options: string[];
  className?: string;
  defaultSelectedOption: string;
  onOptionClick: (value: string) => void;
}

const scrollOffset = 100;

type ScrollDirection = "up" | "down";

const AudioOptions = ({
  title,
  options,
  defaultSelectedOption,
  onOptionClick,
  className,
}: Props) => {
  const pickerContainerRef = useRef<HTMLDivElement>(null);
  const pickerContentRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectionOption] = useState(defaultSelectedOption);
  const [showUpArr, setShowUpArr] = useState(false);
  const [showDownArr, setShowDownArr] = useState(false);
  // track last arrow clicked
  const [activeArrow, setActiveArrow] = useState<ScrollDirection | null>(null);

  useLayoutEffect(() => {
    // show up/down arrows?
    function onResize() {
      if (pickerContainerRef.current && pickerContentRef.current) {
        const containerHeight = pickerContainerRef.current.clientHeight;
        const contentHeight = pickerContentRef.current.clientHeight;

        const currentScrollTop = pickerContainerRef.current.scrollTop;
        const showUp = currentScrollTop > 0;
        const showDown =
          pickerContainerRef.current.clientHeight + currentScrollTop <
          pickerContainerRef.current.scrollHeight;

        if (contentHeight > containerHeight) {
          setShowUpArr(showUp);
          setShowDownArr(showDown);
        } else {
          setShowUpArr(false);
          setShowDownArr(false);
        }
      }
    }

    // call once
    onResize();
    const throttledOnResize = throttle(onResize, 100);
    AppContext.Web.WindowRef.addEventListener("resize", throttledOnResize);

    return () =>
      AppContext.Web.WindowRef.removeEventListener("resize", throttledOnResize);
  }, [options]);

  const scrollHandler = useCallback(
    (direction: ScrollDirection) => () => {
      if (pickerContainerRef.current) {
        let newYScroll = pickerContainerRef.current.scrollTop;
        const scrollHeight = pickerContainerRef.current.scrollHeight;

        if (direction === "up") {
          // reached the top?
          if (newYScroll - scrollOffset <= 0) {
            newYScroll = 0;
            setShowUpArr(false);
          } else {
            newYScroll -= scrollOffset;
            setShowUpArr(true);
          }

          setShowDownArr(true);
          setActiveArrow("up");
        } else if (direction === "down") {
          // reached the bottom?
          if (
            pickerContainerRef.current.clientHeight +
              (newYScroll + scrollOffset) >=
            scrollHeight
          ) {
            setShowDownArr(false);
            newYScroll = scrollHeight;
          } else {
            newYScroll += scrollOffset;
            setShowDownArr(true);
          }

          setShowUpArr(true);
          setActiveArrow("down");
        }

        pickerContainerRef.current.scroll({
          top: newYScroll,
          behavior: "smooth",
        });
      }
    },
    []
  );

  const handleOptionClick = (value: string) => () => {
    setSelectionOption(value);
    onOptionClick(value);
  };

  return (
    <Container className={className}>
      <Typography variant="h3">{title}</Typography>
      <PickerContainer ref={pickerContainerRef}>
        <PickerContent ref={pickerContentRef}>
          {options.map((option, i) => (
            <PickerOption key={i} onClick={handleOptionClick(option)}>
              <PickerIcon
                name="check-mark"
                $selected={selectedOption === option}
              />
              <PickerName $selected={selectedOption === option}>
                {option}
              </PickerName>
            </PickerOption>
          ))}
        </PickerContent>
      </PickerContainer>
      <ArrowContainer>
        <StyledIconButton
          name="arrow-up"
          variant="simple"
          onClick={scrollHandler("up")}
          $show={showUpArr}
          $active={activeArrow === "up"}
        />
        <StyledIconButton
          name="arrow-down"
          variant="simple"
          onClick={scrollHandler("down")}
          $show={showDownArr}
          $active={activeArrow === "down"}
        />
      </ArrowContainer>
    </Container>
  );
};

export default AudioOptions;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 10px;
`;

const PickerContainer = styled.div`
  overflow: auto;
  ${disableScrollbar}
`;

const PickerContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PickerOption = styled.div`
  display: flex;
  padding: 10px 20px 10px 0;
  gap: 15px;
  border-bottom: 1px solid gray;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PickerIcon = styled(Icon)<{ $selected: boolean }>`
  visibility: ${(props) => (props.$selected ? "visible" : "hidden")};
`;

const PickerName = styled.div<{ $selected: boolean }>`
  font-size: 19px;
  ${defaultVideoControlsOpacity}

  //modifier
  ${(props) =>
    props.$selected &&
    css`
      font-weight: bold;
      opacity: 1;
    `}

  &:hover {
    font-weight: bold;
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)<{
  $show: boolean;
  $active: boolean;
}>`
  margin-right: 0;
  visibility: hidden;
  ${defaultVideoControlsOpacity}

  ${(props) =>
    props.$show &&
    css`
      visibility: visible;
    `}

    ${(props) =>
    props.$active &&
    css`
      opacity: 1;
    `}
`;
