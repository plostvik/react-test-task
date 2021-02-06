import React, { useMemo, Fragment } from 'react';
import { useTable, useExpanded } from 'react-table';
import { COLUMNS } from './columns';
import PropTypes from 'prop-types';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CharactersTable = ({ characters }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => characters, [characters]);
  const tableInstance = useTable({ columns, data }, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = tableInstance;

  const renderRowSubComponent = row => {
    const alies = row.values.expander;
    return (
      <ul>
        {alies.map(el => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    );
  };

  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Fragment key={row.getRowProps().key}>
              <TableRow>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
              {row.isExpanded && (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length}>
                    {renderRowSubComponent(row)}
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          );
        })}
      </TableBody>
    </MaUTable>
  );
};

CharactersTable.propTypes = {
  characters: PropTypes.array.isRequired,
};

export default CharactersTable;
