import { Component, OnInit, Input } from '@angular/core';
import { ILocalArea } from '../../AreaInterface';
import { DataService } from '../../services/data.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() color!: string;
  localAreas: ILocalArea[] = [];
  faSort = faSort;

  //@Input() localArea!: ILocalArea;
  constructor(private taskService: DataService) {}

  ngOnInit(): void {
    this.taskService.getAreas().subscribe((areas) => (this.localAreas = areas));
  }

  filterLocalAreas(caseNumber: number) {
    this.taskService.getAreas().subscribe((areas) => {
      if (caseNumber == 0) {
        this.localAreas = areas;
      } else {
        this.localAreas = areas.filter((x) => parseInt(x.active) > caseNumber);
      }
    });
    //const lst = this.localAreas.filter((x) => parseInt(x.active) > caseNumber);
    //this.localAreas = lst;
  }
}
