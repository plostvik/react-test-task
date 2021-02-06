export const COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Culture',
    accessor: 'culture',
  },
  {
    Header: 'Born',
    accessor: 'born',
  },
  {
    Header: 'Aliases',
    accessor: 'aliases',
    id: 'expander',
    Cell: ({ row }) => {
      const alies = row.values.expander;
      return (
        <>
          {alies[0] !== '' ? (
            <span {...row.getToggleRowExpandedProps()}>
              {row.isExpanded ? '👇' : '👉'}
            </span>
          ) : (
            <span>-</span>
          )}
        </>
      );
    },
  },
];
