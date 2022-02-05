import { ReactElement } from "react";

import classNames from "classnames";
import styled from "styled-components/macro";

// -- Icon Assets
import CheckMark from "assets/images/check-mark.svg";
import ChevronLeft from "assets/images/chevron-left.svg";
import ChevronRight from "assets/images/chevron-right.svg";
import Group from "assets/images/group-icon.png";
import Home from "assets/images/home-icon.svg";
import Movie from "assets/images/movie-icon.svg";
import Originals from "assets/images/original-icon.svg";
import PlayDark from "assets/images/play-icon-black.png";
import PlayLight from "assets/images/play-icon-white.png";
import Series from "assets/images/series-icon.svg";
import Subtitles from "assets/images/subtitles-icon.svg";

// base64 svgs
const ArrowUp =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 0H0v36h36z'/%3E%3Cpath fill='%23F9F9F9' d='M29.79 24.658c.64.584 1.59.386 2.007-.353.136-.229.203-.503.203-.783 0-.431-.167-.854-.485-1.138L19.342 11.338a1.27 1.27 0 00-1.724 0L5.479 22.388c-.518.475-.624 1.3-.277 1.92.418.739 1.364.936 2.006.352l11.274-10.261 11.309 10.26zM18.264 12.48a.35.35 0 00.434.001l-.216.197-.218-.198zM6.593 23.555c-.007-.012 0-.058-.03-.031a.078.078 0 01.03.03zm23.846-.027l-.008-.007.008.007z'/%3E%3C/g%3E%3C/svg%3E";
const ArrowDown =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 36H0V0h36z'/%3E%3Cpath fill='%23CACACA' d='M28.35 11.565c.578-.538 1.433-.355 1.81.325.122.21.182.463.182.72 0 .398-.15.786-.437 1.048L18.93 23.827a1.127 1.127 0 01-1.555 0L6.432 13.655c-.468-.438-.563-1.198-.25-1.767.377-.681 1.23-.863 1.809-.325l10.164 9.446 10.195-9.445zM17.957 22.776a.309.309 0 01.391 0l-.194-.181-.197.181zM7.436 12.581c-.006.01 0 .053-.027.028a.072.072 0 00.027-.028zm21.5.024c-.004.002-.006.005-.008.007l.007-.007z'/%3E%3C/g%3E%3C/svg%3E";

const PlusIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    background-color: ${(props) => props.theme.colors.white.default};
    display: inline-block;

    &:first-child {
      width: 16px;
      height: 2px;
      //transform is "identical" to applying top and left when element has position: relative
      transform: translate(1px, 0px) rotate(0deg);
    }

    &:nth-child(2) {
      width: 2px;
      height: 16px;
      transform: translate(-8px, 0px) rotate(0deg);
    }
  }
`;

const CloseIconContainer = styled(PlusIconContainer)`
  span {
    &:first-child {
      height: 1px;
      transform: translate(0px, -0.5px) rotate(45deg);
    }

    &:nth-child(2) {
      width: 1px;
      transform: translate(-8.5px, 0px) rotate(45deg);
    }
  }
`;

export type IconName =
  | "arrow-up"
  | "arrow-down"
  | "check-mark"
  | "chevron-left"
  | "chevron-right"
  | "close"
  | "group"
  | "home"
  | "movies"
  | "originals"
  | "play-light"
  | "play-dark"
  | "plus"
  | "series"
  | "subtitles";

interface IconProps {
  className?: string;
  name: IconName;
  dataTestId?: string;
  title?: string;
}

const generateImgTag = (iconSrc: string) => <img src={iconSrc} alt="icon" />;

const Icons: Record<IconName, ReactElement> = {
  "arrow-up": generateImgTag(ArrowUp),
  "arrow-down": generateImgTag(ArrowDown),
  "check-mark": generateImgTag(CheckMark),
  "chevron-left": generateImgTag(ChevronLeft),
  "chevron-right": generateImgTag(ChevronRight),
  close: (
    <CloseIconContainer>
      <span />
      <span />
    </CloseIconContainer>
  ),
  group: generateImgTag(Group),
  home: generateImgTag(Home),
  movies: generateImgTag(Movie),
  originals: generateImgTag(Originals),
  "play-light": generateImgTag(PlayLight),
  "play-dark": generateImgTag(PlayDark),
  plus: (
    <PlusIconContainer>
      <span />
      <span />
    </PlusIconContainer>
  ),
  series: generateImgTag(Series),
  subtitles: generateImgTag(Subtitles),
};

const getIcon = (name: IconName) => Icons[name];

const Icon = ({ className, name, title, dataTestId }: IconProps) => {
  const iconElement = getIcon(name);
  return (
    <div
      className={classNames(`component__icon--${name}`, className)}
      data-testid={dataTestId}
      title={title}
    >
      {iconElement}
    </div>
  );
};

export default Icon;
