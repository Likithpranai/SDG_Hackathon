declare module 'react-map-gl' {
  import * as React from 'react';
  
  export interface ViewState {
    longitude: number;
    latitude: number;
    zoom: number;
    bearing?: number;
    pitch?: number;
    padding?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  }
  
  export interface ViewStateChangeEvent {
    viewState: ViewState;
    interactionState: any;
    oldViewState: ViewState;
  }
  
  export interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
    mapboxAccessToken?: string;
    mapStyle?: string;
    longitude?: number;
    latitude?: number;
    zoom?: number;
    bearing?: number;
    pitch?: number;
    onMove?: (evt: ViewStateChangeEvent) => void;
    onMoveStart?: (evt: ViewStateChangeEvent) => void;
    onMoveEnd?: (evt: ViewStateChangeEvent) => void;
    onZoom?: (evt: ViewStateChangeEvent) => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
  }
  
  export interface MarkerProps {
    longitude: number;
    latitude: number;
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    offset?: [number, number];
    onClick?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
  }
  
  export interface PopupProps {
    longitude: number;
    latitude: number;
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    offset?: [number, number];
    closeOnClick?: boolean;
    onClose?: () => void;
    className?: string;
    children?: React.ReactNode;
  }
  
  export interface NavigationControlProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    showCompass?: boolean;
    showZoom?: boolean;
  }
  
  export default class Map extends React.Component<MapProps> {}
  export class Marker extends React.Component<MarkerProps> {}
  export class Popup extends React.Component<PopupProps> {}
  export class NavigationControl extends React.Component<NavigationControlProps> {}
}
