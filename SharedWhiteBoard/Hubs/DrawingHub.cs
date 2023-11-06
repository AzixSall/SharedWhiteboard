using Microsoft.AspNetCore.SignalR;

namespace SharedWhiteBoard.Hubs
{
    public class DrawingHub : Hub
    {
        public Task Drawing(int prevX, int prevY, int currentX, int currentY, string color)
        {
            return Clients.Others.SendAsync("drawing", prevX, prevY, currentX, currentY, color);
        }
    }
}
