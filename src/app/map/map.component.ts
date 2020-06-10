import {Component, OnInit, OnChanges, Input, } from '@angular/core';
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
import {Debtor, Killer} from '../models';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit, OnChanges {
  map: Map;
  mousePosition: MousePosition;
  layer: Layer;

  @Input() killers: Killer [];
  @Input() debtors: Debtor [];

  constructor() {
  }
  ngOnInit() {
    this.getMousePosition();
    this.getMap();
    this.getLayer();
  }

  ngOnChanges() {
    if (this.map && this.killers) {
      this.addKillerLocations();
    }
    if (this.map && this.debtors) {
      this.addDebtorLocations();
    }
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
        center: fromLonLat([19.17, 52.12]),
        zoom: 6.3
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

  getKillersLocation(killer: Killer): number[] {
    return killer.location.split('/').map(location => +location);
  }

  addKillerLocations() {
    const killerLocation = this.killers.map(killer => this.getKillersLocation(killer));
    const killersVectorSource = this.getVectorSource(killerLocation, 'assets/gun.png');
    const killersLayer = new VectorLayer({
      source: killersVectorSource
    });
    this.map.addLayer(killersLayer);
  }

  getDebtorsLocation(debtor: Debtor): number[] {
    return debtor.location.split('/').map(location => + location);
  }

  addDebtorLocations() {
    const debtorLocation = this.debtors.map(debtor => this.getDebtorsLocation(debtor));
    const debtorVectorSource = this.getVectorSource(debtorLocation, 'assets/target.png');
    const debtorsLayer = new VectorLayer({
      source: debtorVectorSource
    });
    this.map.addLayer(debtorsLayer);
  }

  private getVectorSource(locations: number[][], path: string) {
    const markers: Feature[] = locations.map(location => new Feature({
      geometry: new Point(fromLonLat(location))
    }));
    markers.forEach(marker => marker.setStyle(new Style({
      image: new Icon(
        {
          crossOrigin: 'anonymous',
          src: path
        }
      )
    })));
    return new VectorSource(
      {
        features: markers
      }
    );
  }

  getLayer() {
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(fromLonLat([17.088692, 51.097549]))
          }),
        ]
      })
    });
    this.map.addLayer(this.layer);
  }
}
