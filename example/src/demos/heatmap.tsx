import * as React from 'react';
import ReactMapboxGl, { Layer, Feature } from '../../../';

// tslint:disable-next-line:no-var-requires
const data = require('./heatmapData.json');
// tslint:disable-next-line:no-var-requires
const { token, styles } = require('./config.json');

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  flex: 1
};

export interface Props {
  // tslint:disable-next-line:no-any
  onStyleLoad?: (map: any) => any;
}

export default class Heatmap extends React.Component<Props> {
  private center = [-0.109970527, 51.52916347] as [number, number];

  // tslint:disable-next-line:no-any
  private onStyleLoad = (map: any) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  public render() {
    return (
      <Map
        style={styles.dark}
        center={this.center}
        containerStyle={mapStyle}
        onStyleLoad={this.onStyleLoad}
      >
        <Layer type="heatmap">
          {data.map((el: any, index: number) => (
            <Feature key={index} coordinates={el.latlng} properties={el} />
          ))}
        </Layer>
      </Map>
    );
  }
}
