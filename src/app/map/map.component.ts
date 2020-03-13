import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  map: Map;
  mousePosition: MousePosition;
  layer: Layer;

  ngOnInit() {
    this.getMousePosition();
    this.getMap();
    this.getLayer();
    this.map.addLayer(this.layer);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck() {
    this.map.updateSize();
  }

  getMap() {
    this.map = new Map({
      controls: defaultControls().extend([this.mousePosition]),
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([17.088692, 51.097549]),
        zoom: 6
      })
    });
  }

  getMousePosition() {
    this.mousePosition = new MousePosition({
      coordinateFormat: createStringXY(6),
      projection: 'EPSG:4326',
      undefinedHTML: '&nbsp;'
    });
  }

  getLayer() {
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([17.088692, 51.097549]))
          })
        ]
      })
    });
  }
}
