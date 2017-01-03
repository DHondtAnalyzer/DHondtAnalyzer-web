import {Component, OnInit} from '@angular/core';
import {Region} from "../../../../../dao/model/region";
import {MdDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {Election} from "../../../../../dao/model/election";
import {DialogComponent} from "../../../../shared/dialog/dialog-component";
import {BehaviorSubject, Observable} from "rxjs";
import {DaoService} from "../../../../../dao/dao.service";
import {AppList} from "../../../../../dao/app-list";
import 'rxjs/add/operator/map';
import {District} from "../../../../../dao/model/district";
import {AppListObservableObject} from "../../../../../dao/app-list-observable-object";

@Component({
    selector: 'app-region-detail',
    templateUrl: './region-detail.component.html',
    styleUrls: ['./region-detail.component.css']
})
export class RegionDetailComponent implements DialogComponent, OnInit {


    private editing: boolean;

  private isFullScreen: boolean;
  private resizableSubscriber:BehaviorSubject<boolean>;


    /**
     * Atributo id.
     *
     * El tipo es Party.
     */
    private _model: Region;
    private _id: string;
    private _electionList: AppList<Election>;
    /**
     *
     * @type {"../../Observable".Observable<T>}
     * @private
     */
    private _onResize;

  /**
   * Constructor de la clase.
   */
  constructor(private dialogRef: MdDialogRef<RegionDetailComponent>,
              private daoService: DaoService,
              private router: Router) {
    this.resizableSubscriber = new BehaviorSubject<boolean>(false)

    this.onResize = this.resizableSubscriber.asObservable()

  }


    /**
     * Getter del atributo id.
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @returns {string}
     */
    get id(): string {
        return this._id;
    }


    /**
     * Setter del atributo id
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @param value
     */
    set id(value: string) {
        this._id = value;
    }


  /**
   * Getter del atributo party.
   *
   * Se ha creado para facilitar la comprensión del código refiriendose
   * directamente como un partido y no como un modelo.
   *
   * @returns {Party}
   */
  get region(): Region {
      return this._model;
  }


  /**
   * Setter del atributo party.
   *
   * Se ha creado para facilitar la comprensión del código refiriendose
   * directamente como un partido y no como un modelo.
   *
   * @returns {Party}
   */
  set region(value: Region) {
      this._model = value;
  }

  get electionList(): AppList<Election> {
    return this._electionList;
  }

  set electionList(value: AppList<Election>) {
    this._electionList = value;
  }


  /**
   * Getter del atributo onResize.
   * (necesario por la interfaz DialogComponent)
   *
   * @returns {Observable<boolean>}
   */
  get onResize(): Observable<boolean> {
    return this._onResize;
  }


  /**
   * Setter del atributo onResize.
   * (necesario por la interfaz DialogComponent)
   *
   * @param value
   */
  set onResize(value: Observable<boolean>) {
    this._onResize = value;
  }


  ngOnInit(): void {
    if (this.id) {
      this.daoService.getRegionObjectObservable(this.id)
        .subscribe(item => {
          this.region = item;
          if (!this.electionList) {
            this.region.districtList.subscribe((districtList: District[]) => {
              this.electionList = new AppListObservableObject<Election>();
              districtList.forEach((district: District) => {
                this.electionList.push(district.election);
              });
            });
          }
        });
    } else {
      this.region = Region.newInstance();
      this.editing = true;
    }
  }


    /**
     * Función closeDialog.
     *
     * Es la encargada de cerrar el diálogo.
     */
    private closeDialog(): void {
        this.dialogRef.close();
    }


  private navigateToElection(id: string) {
    this.closeDialog();
    this.router.navigate(['/app/elections', id]);
  }



    /**
     * Función fabIcon.
     *
     * Es la encargada de manejar el control del icono que se muestra en el
     * botón de edición.
     *
     * @returns {string}
     */
    private fabIcon(): string {
        if (this.editing) {
            return 'done';
        } else {
            return 'edit';
        }
    }


  private get iconScreenChange(){
    if(this.isFullScreen){
      return 'fullscreen_exit';
    } else {
      return 'fullscreen';
    }
  }

  private screenStateChange() {
    this.isFullScreen = !this.isFullScreen;
    this.resizableSubscriber.next(this.isFullScreen);
  }


  /**
     * Función editingChange.
     *
     * Es la función encargada de cambiar el estado de edición a visualización
     * y guardar los datos si fuera necesario.
     */
    private editingChange(): void {
        if (this.editing) {
            this.saveChanges();
        }
        this.editing = !this.editing;
    }


  /**
   * Función saveChanges.
   *
   * Es la encargada de guardar los datos después de una modificación o creación.
   */
  private saveChanges(): void {
    this.daoService.saveRegion(this.region).then(() => {
      this.id = this.region.id;
    }).catch(reason => {
      console.error(reason.message);
    });
  }


  /**
   * Función delete.
   *
   * Es la encargada de eliminar la elección de la persistencia de la aplicación.
   */
  private delete(): void {
    this.daoService.deleteRegion(this.region).then(() => {
      this.closeDialog();
    }).catch(reason => {
      console.error(reason.message);
    });
  }
}
