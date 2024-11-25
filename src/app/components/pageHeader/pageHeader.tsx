import './style.css';

export const PageHeader = ({
  heading,
  RightContent,
}: {
  heading: string;
  RightContent?: () => React.JSX.Element;
}) => {
  return (
    <div className="header-container">
      <h1 className="heading">{heading}</h1>
      {RightContent ? <RightContent /> : null}
    </div>
  );
};
