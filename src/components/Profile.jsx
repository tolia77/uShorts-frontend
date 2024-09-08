export default function Profile({ profile }) {
    return (
        <div id="profile">
            <h1>{profile.name}</h1>
            <p>{profile.description}</p>
            <p>followers: {profile.followers}</p>
            <p>followees: {profile.followees}</p>
        </div>
    )
}