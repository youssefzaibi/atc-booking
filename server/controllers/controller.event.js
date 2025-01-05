const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',      
  user: 'root',         
  password: 'root',  
  database: 'booking'       
});

const promisePool = pool.promise();

const Event = {
  async getAllEvents() {
    try {
      const [rows] = await promisePool.execute('SELECT * FROM events ORDER BY event_date ASC');
      return rows;
    } catch (err) {
      throw new Error('Error fetching events: ' + err.message);
    }
  },

  // Get event by ID
  async getEventById(eventId) {
    try {
      const [rows] = await promisePool.execute('SELECT * FROM events WHERE id = ?', [eventId]);
      return rows[0]; // Return first result (event)
    } catch (err) {
      throw new Error('Error fetching event: ' + err.message);
    }
  },

  // Create a new event
  async createEvent(eventData) {
    const { event_name, event_date, location, available_slots } = eventData;
    try {
      const [result] = await promisePool.execute(
        'INSERT INTO events (event_name, event_date, location, available_slots) VALUES (?, ?, ?, ?)',
        [event_name, event_date, location, available_slots]
      );
      return result.insertId; // Return the ID of the newly created event
    } catch (err) {
      throw new Error('Error creating event: ' + err.message);
    }
  },

  // Update an event
  async updateEvent(eventId, eventData) {
    const { event_name, event_date, location, available_slots } = eventData;
    try {
      const [result] = await promisePool.execute(
        'UPDATE events SET event_name = ?, event_date = ?, location = ?, available_slots = ? WHERE id = ?',
        [event_name, event_date, location, available_slots, eventId]
      );
      return result.affectedRows > 0; // Return true if rows were affected
    } catch (err) {
      throw new Error('Error updating event: ' + err.message);
    }
  },

  // Delete an event
  async deleteEvent(eventId) {
    try {
      const [result] = await promisePool.execute('DELETE FROM events WHERE id = ?', [eventId]);
      return result.affectedRows > 0; // Return true if rows were affected
    } catch (err) {
      throw new Error('Error deleting event: ' + err.message);
    }
  },

  // Get available slots for a specific event
  async getAvailableSlots(eventId) {
    try {
      const [rows] = await promisePool.execute('SELECT available_slots FROM events WHERE id = ?', [eventId]);
      return rows[0] ? rows[0].available_slots : 0;
    } catch (err) {
      throw new Error('Error fetching available slots: ' + err.message);
    }
  },
};

module.exports = Event;
