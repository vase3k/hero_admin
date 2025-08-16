import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { activeFilterChanged, fetchFilters } from '../../slices/filtersSlice';
import classNames from 'classnames';

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters.filters);
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    const onFilterChange = filter => {
        dispatch(activeFilterChanged(filter));
    };

    const renderFilters = () => {
        if (filters.length === 0) {
            return <h5>Фильтры не найдены</h5>;
        }

        return filters.map(({ name, label, className }) => {
            const btnClass = classNames('btn', className, {
                active: name === activeFilter,
            });

            return (
                <button key={name} className={btnClass} onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            );
        });
    };

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{renderFilters()}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
