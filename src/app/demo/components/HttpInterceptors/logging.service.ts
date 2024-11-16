import { Injectable } from '@angular/core';
import { NGXLogger,   NgxLoggerLevel } from 'ngx-logger';
 
@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  env: string;
  canDebug: boolean;
 
  constructor(private logger: NGXLogger) {
    // TRACE|DEBUG|INFO|LOG|WARN|ERROR|FATAL|OFF
      this.logger.updateConfig({ level: NgxLoggerLevel.TRACE });
  }
 
  sendTraceLevelMessage(message, source, error) {
    this.logger.trace(message, source, error);
  }
 
  sendDebugLevelMessage(message, source, error) {
    this.logger.debug(message, source, error);
  }
 
  sendInfoLevelMessage(message) {
    this.logger.info(message);
  }
 
  sendLogLevelMessage(message, source, error) {
    this.logger.log(message, source, error);
  }
 
  sendWarnLevelMessage(message, error) {
    this.logger.warn(message, error);
  }
 
  sendErrorLevelMessage(message, source, error) {
    this.logger.error(message, source, error);
  }
 
  sendFatalLevelMessage(message, source, error) {
    this.logger.fatal(message, source, error);
  }
}