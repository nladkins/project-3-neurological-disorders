from flask import Flask
from flask import render_template # to render the error page
import psycopg2

app = Flask(__name__)
@app.route("/")

host = "localhost"
port = "5432"
dbname = "neuro_disorder_db"
user = "admin"
password = "postgres"
db_conn = psycopg2.connect(host=host, port=port, dbname=dbname, user=user, password=password)
db_cursor = db_conn.cursor()

@app.route("/import")
def csv_import():
    # Trap errors for opening the file
    try:
        file_path = "clean-data/neuro_disorder.csv"
        contents = open(file_path, 'r')
    except psycopg2.Error as e:
        message = "Database error: " + e + "/n open() text file: " + file_path
        return render_template("error_page.html", message = message)

    # Trap errors for copying the array to our database
    try:
        db_cursor.copy_from(contents, "tbl_users", columns=('t_name_user', 't_email'), sep=",")
    except psycopg2.Error as e:
        message = "Database error: " + e + "/n copy_from"
        return render_template("error_page.html", message = message)

    # It got this far: Success!

    # Clean up by closing the database cursor and connection
    db_cursor.close()
    db_conn.close()

# Moving the User Forward
if __name__ == "__main__":
    app.run(debug=True)