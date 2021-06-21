/**
 * Database Interfaces
 * * pk: 기본키, ck: 복합키, fk: 외래키, uq: Unique
 * * fake: JOIN, ALIAS등을 통해 반환되는 Attribute나 테이블, 실제 DB Table에는 존재하지 않음.
 * * Nullable Attribute는 null 표시를 해놓음
 */
export interface Meeting {
    id: string;
    name: string;
    roomId: string;
    start: Date;
    end: Date | null;
    participants: number | null;
    createdAt: Date;
    updatedAt: Date;
}
