import {Component, OnInit} from '@angular/core';
import {TeamDto} from '../../models/TeamDto';
import {TeamService} from '../../service/team/team.service';
import {BoardService} from '../../service/board/board.service';
import {Board} from '../../models/Board';


@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit {
  teams: TeamDto[];
  boards: Board[];

  constructor(private teamService: TeamService,
              private boardService: BoardService) {
  }

  ngOnInit() {
    this.getAllUserTeams();
    this.getAllUserBoards();
  }

  getAllUserTeams() {
    this.teamService.getAllUserTeams()
      .subscribe(teams => this.teams = teams);
  }

  getAllUserBoards() {
    this.boardService.getAllUserBoards()
      .subscribe(boards => this.boards = boards);
  }

  createBoard(name: String, boardType: String) {
    this.boardService.createBoard({name, boardType} as Board)
      .subscribe(board => this.boards.push(board));
  }

  createTeam(name: string) {
    this.teamService.cteateTeam(name)
      .subscribe(team => this.teams.push(team));
  }
}
