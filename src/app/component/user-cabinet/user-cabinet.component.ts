import {Component, OnInit} from '@angular/core';
import {Team} from '../../entity/Team';
import {TeamService} from '../../service/team/team.service';
import {BoardService} from '../../service/board/board.service';
import {Board} from '../../entity/Board';


@Component({
  selector: 'app-home-page',
  templateUrl: './user-cabinet.html',
  styleUrls: ['./user-cabinet.css']
})
export class UserCabinetComponent implements OnInit {
  teams: Team[];
  boards: Board[];
  createdBoard: Board;


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
      .subscribe(createdBoard => this.boards.push(createdBoard));
  }
}
