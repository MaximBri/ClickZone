import sqlalchemy as sa
import sqlalchemy.orm as so

from app import models, create_app, db

app = create_app()


@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'User': models.User, 'UserUpgrade': models.UserUpgrade,
            'Upgrade': models.Upgrade}


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
