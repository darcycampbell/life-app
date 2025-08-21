const tableQueries = {
  lifestyle: `
    UPDATE habits h
    SET score = (
      WITH metrics AS (
        SELECT 
          AVG(entry_count)::float as record_avg
        FROM habit_records hr
        WHERE hr.habit_id = h.id
      )
      SELECT metrics.record_avg / h.target
      FROM metrics
    )
    RETURNING *;
  `,
  interpersonal: `
    UPDATE contacts c
    SET score = (
      WITH metrics AS (
        SELECT 
          COUNT(*) as record_count,
          MIN(entry_date) as start_date
        FROM contact_records cr
        WHERE cr.contact_id = c.id
      )
      SELECT c.target / ((CURRENT_DATE - metrics.start_date) / metrics.record_count) 
      FROM metrics
    )
    RETURNING *;
  `,
  financial: `
    UPDATE goals g
    SET score = (
      WITH metrics AS (
        SELECT 
          SUM(entry_amount) as record_total
        FROM goal_records gr
        WHERE gr.goal_id = g.id
      )
      SELECT metrics.record_total / g.target
      FROM metrics
    )
    RETURNING *;
  `,
  external:  `
    UPDATE tasks t
    SET score = (
      WITH metrics AS (
        SELECT
          task_id,
          PERCENT_RANK() OVER ( ORDER BY urgency_score ) as urgency_percentile
        FROM task_records
      )
      SELECT metrics.urgency_percentile * 100 / (100 - t.target)
      FROM metrics
      WHERE metrics.task_id = t.id
    )
    RETURNING *;
  `,
};

export default tableQueries;
