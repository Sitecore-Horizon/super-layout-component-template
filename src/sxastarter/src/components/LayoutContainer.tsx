import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const columnClasses = [
    props.params.Column1Classes,
    props.params.Column2Classes,
    props.params.Column3Classes,
    props.params.Column4Classes,
    props.params.Column5Classes,
    props.params.Column6Classes,
    props.params.Column7Classes,
    props.params.Column8Classes,
  ];
  const columnStyles = [
    props.params.Styles1,
    props.params.Styles2,
    props.params.Styles3,
    props.params.Styles4,
    props.params.Styles5,
    props.params.Styles6,
    props.params.Styles7,
    props.params.Styles8,
  ];
  let enabledColumns = Number.parseInt(props.params.EnabledColumns);
	if(isNaN(enabledColumns)) {
		enabledColumns = 1;
	}
	const gap = props.params.Gap;
	const enabledColIndexes = [...Array(enabledColumns).keys()];

  const id = props.params.RenderingIdentifier;

  return (
    <div style={{width: "100%", gap}}  className={`layout-container`} id={id ? id : undefined}>
      {enabledColIndexes.map((index) => {
        const phKey = `column-${index+1}-{*}`;				
        const phStyles = `${columnStyles[index] ?? ''}`.trimEnd();
        const columnClass = columnClasses[index];

        return (
          <div key={index+1} className={`${phStyles} ${columnClass} layout-column`}>
            <div key={index} className="">
              <Placeholder key={index} name={phKey} rendering={props.rendering} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
