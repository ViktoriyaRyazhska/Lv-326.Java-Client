import {Component, OnInit} from '@angular/core';
import {Board} from '../../entity/Board';
import {TeamService} from '../../service/team/team.service';
import {TeamDto} from '../../entity/TeamDto';
import {ActivatedRoute} from '@angular/router';
import {UserDto} from '../../entity/UserDto';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  currentTeam: TeamDto;
  board: Board;
  teamBoards: Board[];
  users: UserDto[];

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

  getAllTeamMembers(id: number) {
    this.teamService.getAllTeamMembers(id)
      .subscribe(users => this.users = users);
  }

  deleteUserFromTeam(teamId: number, userId: number) {
    if (confirm(`Delete user?`)) {
      this.teamService.deleteUserFromTeam(teamId, userId).subscribe();
    }
  }
}
