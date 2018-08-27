import {Component, OnInit} from '@angular/core';
import {Team} from '../../entity/Team';
import {TeamService} from '../../service/team/team.service';
import {BoardService} from '../../service/board/board.service';
import {Board} from '../../entity/Board';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  teams: Team[];
  boards: Board[];

  constructor(private teamService: TeamService,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.getAllUserTeams();
  }

  getAllUserTeams() {
    this.teamService.getAllUserTeams()
      .subscribe(teams => this.teams = teams);
  }

  getAllUserBoards() {
    this.boardService.getAllUserBoards()
      .subscribe(boards => this.boards = boards);
  }
}
