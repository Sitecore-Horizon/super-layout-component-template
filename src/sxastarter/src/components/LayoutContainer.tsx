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

export function parseInlineStyles(styles: string | undefined): Record<string,string> {
  const stylePairs = styles?.split(';') ?? [];
  const styleObject: Record<string,string> = {};
  stylePairs.forEach((pair) => {
    const [key, value] = pair.split(':');
    if(key && value){
      styleObject[key.trim()] = value.trim();
    }
  });

  return styleObject;
}


export const Default = (props: ComponentProps): JSX.Element => {

  const columnSizes = [
    props.params.ColumnSize1,
    props.params.ColumnSize2,
    props.params.ColumnSize3,
    props.params.ColumnSize4,
    props.params.ColumnSize5,
    props.params.ColumnSize6,
    props.params.ColumnSize7,
    props.params.ColumnSize8,
  ];

  const columnStyles = [
    props.params.ColumnStyle1,
    props.params.ColumnStyle2,
    props.params.ColumnStyle3,
    props.params.ColumnStyle4,
    props.params.ColumnStyle5,
    props.params.ColumnStyle6,
    props.params.ColumnStyle7,
    props.params.ColumnStyle8,
  ];

  const containerStyles =  parseInlineStyles(props.params.ContainerStyles);
  let enabledColumns = Number.parseInt(props.params.EnabledColumns);

  if (isNaN(enabledColumns)|| enabledColumns < 1) {
    enabledColumns = 1;
  }

  if(enabledColumns === 1 && !columnSizes[0]){
    columnSizes[0] = 'basis-full';
  }

  const enabledColIndexes = [...Array(enabledColumns).keys()];

  const id = props.params.RenderingIdentifier;
  
  return (
    <div style={{width: '100%'}}>
      <div
        style={containerStyles}
        className={`layout-container`}
        id={id ? id : undefined}
      >
        {enabledColIndexes.map((index) => {
          const phKey = `layout-column-${index + 1}-{*}`;
          const columnClass = columnSizes[index] ?? '';
          const columnStyle = columnStyles[index] ?? '';

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
