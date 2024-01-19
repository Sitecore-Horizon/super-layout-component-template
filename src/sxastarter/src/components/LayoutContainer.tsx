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

  const styles = JSON.parse(props.params.ContainerStyles ?? "{}") as Record<string, any>;
	const columnStyles = JSON.parse(props.params.ColumnStyles ?? "[]") as Array<Record<string, any>>;


  let enabledColumns = Number.parseInt(props.params.EnabledColumns);
  if (isNaN(enabledColumns)) {
    enabledColumns = 1;
  }
  const enabledColIndexes = [...Array(enabledColumns).keys()];

  const id = props.params.RenderingIdentifier;

  return (
    <div style={{width: '100%'}}>
      <div
        style={styles}
        className={`layout-container`}
        id={id ? id : undefined}
      >
        {enabledColIndexes.map((index) => {
          const phKey = `column-${index + 1}-{*}`;
          const columnClass = columnClasses[index];
					const columnStyle = columnStyles[index];

          return (
            <div key={index + 1} className={`${columnClass} layout-column`}>
              <div key={index} className={`layout-column-content ${columnStyle}`}>
                <Placeholder key={index} name={phKey} rendering={props.rendering} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
