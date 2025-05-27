from app.models import User, Upgrade


def calculate_max_click_coins(user: User) -> int:
    income = user.base_per_click
    MAX_CLICKS_3_MIN = 900
    income *= MAX_CLICKS_3_MIN

    for user_upgrade in user.upgrades.filter_by(active=True).all():
        upgrade = user_upgrade.upgrade
        income *= upgrade.multiplier

    return income
