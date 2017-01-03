var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ContainerComponent } from "./container/container.component";
import { AutoCompleteInputComponent } from "./autocomplete-input/autocomplete-input.component";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search/search.component";
import { JQueryService } from "./jquery.service";
/**
 * Clase AppModule. Implementa la funcionalidad de un Modulo.
 *
 * AppModule es el módulo raíz de la aplicación.
 */
export var SharedModule = (function () {
    /**
     * Constructor de la clase.
     */
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            declarations: [
                ToolbarComponent,
                ContainerComponent,
                AutoCompleteInputComponent,
                SearchComponent,
            ],
            providers: [
                JQueryService
            ],
            imports: [
                CommonModule,
                FormsModule,
                MaterialModule.forRoot(),
            ],
            exports: [
                ToolbarComponent,
                ContainerComponent,
                AutoCompleteInputComponent,
                SearchComponent,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/shared.module.js.map