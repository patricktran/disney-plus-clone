import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
  portalContainerRef: Element | HTMLElement | HTMLDivElement;
}

const CreatePortal = ({ children, portalContainerRef }: Props) => {
  return ReactDOM.createPortal(children, portalContainerRef);
};

export default CreatePortal;
