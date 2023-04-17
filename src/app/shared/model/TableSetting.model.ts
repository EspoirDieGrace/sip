import { NzTableSize, NzTableLayout, NzTablePaginationPosition } from 'ng-zorro-antd/table';

export interface TableSetting {
    bordered?: boolean;
    loading?: boolean;
    pagination?: boolean;
    sizeChanger?: boolean;
    title?: boolean;
    header?: boolean;
    footer?: boolean;
    expandable?: boolean;
    checkbox?: boolean;
    fixHeader?: boolean;
    noResult?: boolean;
    ellipsis?: boolean;
    simple?: boolean;
    size?: NzTableSize;
    tableScroll?: string;
    tableLayout?: NzTableLayout;
    position?: NzTablePaginationPosition;
  }