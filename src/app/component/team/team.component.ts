import {Component, OnInit} from '@angular/core';
import {Board} from '../../entity/Board';
import {TeamService} from '../../service/team/team.service';
import {Team} from '../../entity/Team';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  currentTeam: Team;
  board: Board;
  teamBoards: Board[];

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (+this.route.snapshot.paramMap.get('id')) {
      this.getRouteTeam();
    }
  }

  getTeam(id: number) {
    this.teamService.getTeam(id)
      .subscribe(team => this.currentTeam = team);
  }

  getRouteTeam() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getTeam(id);
  }

  getAllTeamBoards(id: number) {
    this.teamService.getAllTeamBoards(id)
      .subscribe(boards => this.teamBoards = boards);
  }

  getAllTeamMembers(teamId: number) {

  }

  createTeam() {

  }
}
