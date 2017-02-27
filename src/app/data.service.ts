import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class DataService {
    public  a=5;
    count(){
      this.a+=5
    }
    get(){
      return this.a;
    }
  // Observable string sources
  private missionAnnouncedSource = new Subject<number>();
  private missionConfirmedSource = new Subject<number>();
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  // Service message commands
  announceMission(mission: any) {
    this.missionAnnouncedSource.next(mission);
  }
  confirmMission(astronaut: any) {
    this.missionConfirmedSource.next(astronaut);
  }
}
