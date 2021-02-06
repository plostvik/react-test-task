import React, { useEffect, useMemo } from 'react';
import { useTable, useExpanded } from 'react-table';
import { COLUMNS } from './columns';
import PropTypes from 'prop-types';

const CharactersTable = ({ characters }) => {
  //написать ф-цию подготовки данных

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => characters, [characters]);
  const tableInstance = useTable({ columns, data }, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          console.log(row);
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                console.log(cell);
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CharactersTable.propTypes = {
  // bla: PropTypes.string,
};

CharactersTable.defaultProps = {
  // bla: 'test',
};

export default CharactersTable;
