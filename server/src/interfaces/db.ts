/**
 * Database Interfaces
 * * pk: 기본키, ck: 복합키, fk: 외래키, uq: Unique
 * * fake: JOIN, ALIAS등을 통해 반환되는 Attribute나 테이블, 실제 DB Table에는 존재하지 않음.
 * * Nullable Attribute는 null 표시를 해놓음
 */
export interface Transaction {
    query: string;
    args: any[];
}

export interface ResultSetHeader {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
    changedRows: number;
}
